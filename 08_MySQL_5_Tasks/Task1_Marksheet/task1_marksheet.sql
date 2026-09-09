USE bcs_portfolio_2026;
DROP TABLE IF EXISTS marks,students;
CREATE TABLE students(roll_no VARCHAR(20) PRIMARY KEY,name VARCHAR(100) NOT NULL,college VARCHAR(100),course VARCHAR(50),created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE marks(id INT AUTO_INCREMENT PRIMARY KEY,roll_no VARCHAR(20),subject_code INT,subject_name VARCHAR(50),obtained INT,grade VARCHAR(5),FOREIGN KEY(roll_no) REFERENCES students(roll_no) ON DELETE CASCADE);
INSERT INTO students(roll_no,name,college,course) VALUES('BCS202601','Amit Patil','New Arts College','BCS'),('BCS202602','Rahul Deshmukh','New Arts College','BCS');
INSERT INTO marks(roll_no,subject_code,subject_name,obtained,grade) VALUES('BCS202601',101,'HTML',85,'O'),('BCS202601',102,'CSS',78,'A+'),('BCS202601',103,'JavaScript',82,'A+'),('BCS202601',104,'Python',88,'O'),('BCS202601',105,'DBMS',75,'A');
SELECT s.roll_no,s.name,SUM(m.obtained) total,AVG(m.obtained) percentage FROM students s JOIN marks m USING(roll_no) GROUP BY s.roll_no,s.name;
SELECT roll_no,subject_name,obtained,CASE WHEN obtained>=40 THEN 'PASS' ELSE 'FAIL' END result FROM marks;
