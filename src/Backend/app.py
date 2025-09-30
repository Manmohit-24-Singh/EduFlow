from flask import Flask, request, jsonify
import json
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize students list
students = [
    {
        "id": 1,
        "username": "admin",
        "password": "admin123",
        "email": "admin@example.com",
        "enrolled_courses": []
    }
]

# Load data from JSON files
with open('courses.json') as f:
    courses_data = json.load(f)

with open('testimonials.json') as f:
    testimonials_data = json.load(f)

# Helper function to find student by username
def find_student_by_username(username):
    return next((s for s in students if s['username'] == username), None)

# Helper function to find student by ID
def find_student_by_id(student_id):
    return next((s for s in students if s['id'] == student_id), None)

# 1. Student Registration API
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    
    if find_student_by_username(username):
        return jsonify({"message": "Username already taken"}), 400
    
    new_student = {
        "id": len(students) + 1,
        "username": username,
        "password": password,  # Remember to hash in production
        "email": email,
        "enrolled_courses": []
    }
    students.append(new_student)
    
    return jsonify({
        "message": "Registration successful",
        "student_id": new_student['id']
    }), 201

# 2. Login API
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    student = find_student_by_username(username)
    if not student or student['password'] != password:
        return jsonify({"message": "Invalid username or password"}), 401
    
    return jsonify({
        "message": "Login successful",
        "student_id": student['id']
    }), 200

# 3. Testimonials API
@app.route('/testimonials', methods=['GET'])
def get_testimonials():
    random_testimonials = random.sample(testimonials_data, 2)
    return jsonify(random_testimonials), 200

# 4. Enroll Courses API
@app.route('/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
    student = find_student_by_id(student_id)
    if not student:
        return jsonify({"message": "Student not found"}), 404
    
    course = request.get_json()
    
    # Check if already enrolled
    if course in student['enrolled_courses']:
        return jsonify({"message": "Course already enrolled"}), 400
    
    student['enrolled_courses'].append(course)
    return jsonify({"message": "Course enrolled successfully"}), 200

# 5. Delete Courses API
@app.route('/drop/<int:student_id>', methods=['DELETE'])
def drop_course(student_id):
    try:
        student = find_student_by_id(student_id)
        if not student:
            return jsonify({"message": "Student not found"}), 404
        
        course_data = request.get_json()
        if not course_data:
            return jsonify({"message": "No data provided"}), 400
        
        course_id = course_data.get('id')
        if not course_id:
            return jsonify({"message": "Course ID not provided"}), 400
        
        # Find index of course to remove
        course_index = None
        for i, course in enumerate(student['enrolled_courses']):
            if course.get('id') == course_id:
                course_index = i
                break
        
        if course_index is None:
            return jsonify({"message": "Course not found in enrolled courses"}), 404
        
        # Remove the course
        student['enrolled_courses'].pop(course_index)
        
        return jsonify({
            "message": "Course dropped successfully",
            "remaining_courses": student['enrolled_courses']
        }), 200
    
    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# 6. Get All Courses API
@app.route('/courses', methods=['GET'])
def get_all_courses():
    return jsonify(courses_data), 200

# 7. Get Student Courses API
@app.route('/student_courses/<int:student_id>', methods=['GET'])
def get_student_courses(student_id):
    student = find_student_by_id(student_id)
    if not student:
        return jsonify([]), 200
    
    return jsonify(student['enrolled_courses']), 200

if __name__ == '__main__':
    app.run(port=8000, debug=True)