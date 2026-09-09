#include <iostream>
#include <fstream>
using namespace std; class IDCard{public:string name,roll,course;void save(){ofstream f("idcard.txt");f<<"ID CARD\n"<<name<<"\n"<<roll<<"\n"<<course<<"\nValid Till: 05-2027";}};
int main(){IDCard c;getline(cin,c.name);getline(cin,c.roll);getline(cin,c.course);c.save();cout<<"Saved\n";}