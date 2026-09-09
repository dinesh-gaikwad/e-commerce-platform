#include <iostream>
#include <fstream>
using namespace std; class Resume{public:string name,role,skills;void print(){ofstream f("resume.txt");f<<"RESUME\n"<<name<<"\n"<<role<<"\nSkills: "<<skills;cout<<"resume.txt created\n";}};
int main(){Resume r;getline(cin,r.name);getline(cin,r.role);getline(cin,r.skills);r.print();}