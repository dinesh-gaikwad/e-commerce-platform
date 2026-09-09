def grade(percent):
    if percent >= 75: return "O - Distinction"
    if percent >= 60: return "A - First Class"
    if percent >= 45: return "B - Second Class"
    return "F - Fail"

name = input("Student name: ").strip() or "Student"
subjects = ["HTML", "CSS", "JavaScript", "Python", "MySQL"]
marks = []
for subject in subjects:
    while True:
        try:
            value = int(input(f"{subject} marks (0-100): "))
            if 0 <= value <= 100:
                marks.append(value); break
        except ValueError:
            pass
        print("Enter a number from 0 to 100.")
total = sum(marks)
percentage = total / len(marks)
print("\n--- MARKSHEET ---")
print("Name:", name)
for s, m in zip(subjects, marks):
    print(f"{s:12} {m:3} {'PASS' if m >= 40 else 'FAIL'}")
print("Total:", total, "/", len(subjects)*100)
print("Percentage:", f"{percentage:.2f}%")
print("Grade:", grade(percentage))
