USE bcs_portfolio_2026;
DROP TABLE IF EXISTS skills,resumes;
CREATE TABLE resumes(resume_id INT AUTO_INCREMENT PRIMARY KEY,roll_no VARCHAR(20),full_name VARCHAR(100),email VARCHAR(100),phone VARCHAR(15),objective TEXT,FOREIGN KEY(roll_no) REFERENCES students(roll_no));
CREATE TABLE skills(skill_id INT AUTO_INCREMENT PRIMARY KEY,resume_id INT,skill_name VARCHAR(50),level VARCHAR(30),FOREIGN KEY(resume_id) REFERENCES resumes(resume_id) ON DELETE CASCADE);
INSERT INTO resumes(roll_no,full_name,email,phone,objective) VALUES('BCS202601','Amit Patil','amit@example.com','9876543210','Web Developer');
INSERT INTO skills(resume_id,skill_name,level) VALUES(1,'HTML','Expert'),(1,'CSS','Expert'),(1,'JavaScript','Intermediate'),(1,'MySQL','Intermediate');
SELECT r.full_name,r.email,GROUP_CONCAT(s.skill_name) skills FROM resumes r LEFT JOIN skills s USING(resume_id) GROUP BY r.resume_id;
