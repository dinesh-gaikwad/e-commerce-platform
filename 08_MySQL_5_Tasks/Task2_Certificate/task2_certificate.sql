USE bcs_portfolio_2026;
DROP TABLE IF EXISTS certificates;
CREATE TABLE certificates(cert_id VARCHAR(30) PRIMARY KEY,student_name VARCHAR(100) NOT NULL,course VARCHAR(100),issue_date DATE,issued_by VARCHAR(100),qr_data TEXT,status ENUM('Valid','Revoked') DEFAULT 'Valid');
INSERT INTO certificates VALUES('CERT-2026-001','Amit Patil','Web Development','2026-05-15','New Arts College','Name:Amit|ID:CERT-2026-001','Valid');
SELECT * FROM certificates WHERE cert_id='CERT-2026-001';
UPDATE certificates SET status='Revoked' WHERE cert_id='CERT-2026-001';
