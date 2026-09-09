#include <iostream>
#include <fstream>
using namespace std; class Certificate{public:string name,course,id;void save(){ofstream f("certificate.txt");f<<"CERTIFICATE\n"<<name<<"\n"<<course<<"\n"<<id;cout<<"Saved\n";}};
int main(){Certificate c;getline(cin,c.name);getline(cin,c.course);getline(cin,c.id);c.save();}