from datetime import date
try:
    import qrcode
except ImportError:
    qrcode = None

name = input("Certificate holder name: ").strip() or "Student"
course = input("Course: ").strip() or "Web Development"
cert_id = input("Certificate ID: ").strip() or "CERT-2026-001"
data = f"Name: {name}\nCourse: {course}\nID: {cert_id}\nDate: {date.today().isoformat()}"
print("\nCERTIFICATE OF COMPLETION")
print(name)
print(f"Course: {course}\nID: {cert_id}\nDate: {date.today()}")
if qrcode:
    qrcode.make(data).save("certificate_qr.png")
    print("QR saved as certificate_qr.png")
else:
    print('Optional dependency missing. Run: pip install "qrcode[pil]"')
