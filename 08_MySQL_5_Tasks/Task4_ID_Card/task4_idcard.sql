USE bcs_portfolio_2026;
DROP TABLE IF EXISTS id_cards;
CREATE TABLE id_cards(id_num VARCHAR(30) PRIMARY KEY,roll_no VARCHAR(20),name VARCHAR(100),course VARCHAR(50),dob DATE,blood_group VARCHAR(5),phone VARCHAR(15),valid_till VARCHAR(20),FOREIGN KEY(roll_no) REFERENCES students(roll_no));
INSERT INTO id_cards VALUES('ID-BCS202601-1234','BCS202601','Amit Patil','BCS','2005-05-15','O+','9876543210','05-2027');
SELECT s.name,s.roll_no,i.id_num,i.blood_group,AVG(m.obtained) percentage FROM students s JOIN id_cards i USING(roll_no) JOIN marks m USING(roll_no) GROUP BY s.roll_no;
