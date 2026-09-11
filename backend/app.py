import os,sqlite3
from flask import Flask,jsonify,request,send_from_directory
from flask_cors import CORS
BASE=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));DIST=os.path.join(BASE,'frontend','dist');DB=os.path.join(BASE,'backend','portfolio.db')
app=Flask(__name__,static_folder=DIST,static_url_path='');CORS(app)
PAGES=['Command Center','About & Story','Developer Profile','Skills Matrix','Technology Stack','Services','Experience','Education','Achievements','Certifications','Projects Hub','Featured Project','Architecture','Case Study','GitHub Lab','Open Source','Code Quality','DSA Lab','Python Lab','JavaScript Lab','C++ Lab','SQL Lab','Frontend Lab','Backend Lab','API Studio','Database Studio','Testing Center','DevOps Center','Career Roadmap','Contact & Credits']
PROJECTS=[{'id':1,'name':'100X Graduation OS','category':'Full Stack','status':'Featured','description':'A long-form developer portfolio and graduation command center with 30 data-rich pages.','stack':['React','Flask','SQLite','Render'],'impact':'30 pages / 360 records'},{'id':2,'name':'Mission Success Academy','category':'EdTech','status':'Concept','description':'Step-locked learning platform concept connecting fundamentals, projects, interviews and jobs.','stack':['React','Flask','JWT','SQLite'],'impact':'Career workflow'},{'id':3,'name':'Developer Analytics Studio','category':'Dashboard','status':'Prototype','description':'KPI-driven project, learning and career analytics interface.','stack':['React','REST','Charts'],'impact':'Decision-ready metrics'}]
SKILLS=[('React','Frontend',90),('JavaScript','Frontend',86),('Python','Backend',88),('Flask','Backend',84),('SQL','Data',80),('Git/GitHub','DevOps',82),('HTML/CSS','Frontend',94),('DSA','Core',70),('C++','Core',64),('REST API','Backend',86),('Responsive UI','Frontend',91),('Testing','Engineering',68)]
def db():
 c=sqlite3.connect(DB);c.row_factory=sqlite3.Row;return c
def init():
 c=db();c.execute('CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,email TEXT NOT NULL,message TEXT NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');c.commit();c.close()
@app.get('/api/health')
def health():return jsonify(status='online',service='Flask API',version='2.0.0')
@app.get('/api/pages')
def pages():return jsonify([{'id':i+1,'name':p} for i,p in enumerate(PAGES)])
@app.get('/api/projects')
def projects():return jsonify(PROJECTS)
@app.get('/api/skills')
def skills():return jsonify([{'name':n,'group':g,'level':v} for n,g,v in SKILLS])
@app.get('/api/stats')
def stats():return jsonify(pages=30,records=360,projects=len(PROJECTS),skills=len(SKILLS),stack=['React','Flask','SQLite','Render'])
@app.get('/api/page/<path:name>')
def page(name):
 if name not in PAGES:return jsonify(error='Page not found'),404
 return jsonify(id=PAGES.index(name)+1,name=name,records=[{'id':i+1,'title':f'{name} — module {i+1}','status':'active'} for i in range(12)])
@app.post('/api/contact')
def contact():
 d=request.get_json(silent=True) or {};name=str(d.get('name','')).strip();email=str(d.get('email','')).strip();message=str(d.get('message','')).strip()
 if not name or not email or not message:return jsonify(error='Name, email and message are required.'),400
 c=db();c.execute('INSERT INTO messages(name,email,message) VALUES(?,?,?)',(name,email,message));c.commit();c.close();return jsonify(success=True,message='Message received. Thank you!')
@app.route('/',defaults={'path':''})
@app.route('/<path:path>')
def spa(path):
 if path.startswith('api/'):return jsonify(error='API route not found'),404
 target=os.path.join(DIST,path)
 if path and os.path.isfile(target):return send_from_directory(DIST,path)
 index=os.path.join(DIST,'index.html')
 if os.path.isfile(index):return send_from_directory(DIST,'index.html')
 return 'Frontend build not found. Run npm run build --prefix frontend.',503
init()
if __name__=='__main__':app.run(host='0.0.0.0',port=int(os.getenv('PORT',5000)),debug=False)
