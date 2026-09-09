#include <iostream>
#include <vector>
using namespace std; class Marksheet{string name;vector<int>m;public:Marksheet(string n):name(n){}void add(int x){m.push_back(x);}void show(){int t=0;for(int x:m)t+=x;cout<<name<<"\nTotal: "<<t<<" Percentage: "<<(double)t/m.size()<<"\n";}};
int main(){Marksheet s("Amit Patil");for(int i=0,x;i<5;i++){cin>>x;s.add(x);}s.show();}