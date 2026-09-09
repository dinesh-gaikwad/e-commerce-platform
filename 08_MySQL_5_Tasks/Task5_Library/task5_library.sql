USE bcs_portfolio_2026;
DROP TABLE IF EXISTS issued_books,books;
CREATE TABLE books(book_id INT PRIMARY KEY,title VARCHAR(100) NOT NULL,author VARCHAR(100),category VARCHAR(50),year INT,available TINYINT DEFAULT 1);
CREATE TABLE issued_books(issue_id INT AUTO_INCREMENT PRIMARY KEY,book_id INT,roll_no VARCHAR(20),issue_date DATE,return_date DATE,status ENUM('Issued','Returned') DEFAULT 'Issued',FOREIGN KEY(book_id) REFERENCES books(book_id),FOREIGN KEY(roll_no) REFERENCES students(roll_no));
INSERT INTO books VALUES(101,'HTML CSS Design','Jon Duckett','Web',2014,1),(102,'JavaScript','Marijn Haverbeke','Web',2018,1),(103,'Python Crash Course','Eric Matthes','Python',2019,0),(104,'DBMS Concepts','Korth','DBMS',2011,1);
INSERT INTO issued_books(book_id,roll_no,issue_date,status) VALUES(103,'BCS202601','2026-05-01','Issued');
SELECT b.title,s.name,ib.issue_date,ib.status FROM issued_books ib JOIN books b USING(book_id) JOIN students s USING(roll_no);
SELECT category,COUNT(*) total,SUM(available) available_count FROM books GROUP BY category;
