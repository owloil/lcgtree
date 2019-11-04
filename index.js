/* some commonly used choices according to wikipedia
1664525 + 1013904223
22695477 + 1
1103515245 + 12345
134775813 + 1
168077 + 0 
I think these numbers are just random large integers or something, I don't remember.*/
var LCGBranchM=(2<<30-1);
var LCGBranchA=[973928748, 726339633, 1245427772, 238889696, 1959198924, 1805982764, 1475560959, 1616637718, 677001546, 43502827];
var LCGBranchC=[483188087, 1553608089, 2058845961, 1996206449, 1320579185, 1024928839, 2117433364, 1777060957, 1480937169, 466908681];
var LCGBranch=function(seed, depth, random_on_branch){
    if(seed===undefined){
        this.seed=Math.floor(Math.random()*LCGBranchC);
    } else {
        this.seed=seed;
    }
    if(depth===undefined){
        this.depth=0
    } else {
        this.depth=depth%LCGBranchA.length;
    }

    if(random_on_branch===undefined){
        this.random_on_branch=true;
    } else {
        this.random_on_branch=random_on_branch;
    }
};

//c-style RAND_MAX
LCGBranch.prototype.RAND_MAX=LCGBranchM;

//convenient default random number. Intended to be used as "new LCG(LCG.defaultseed);"
LCGBranch.prototype.defaultseed=343211599;

//Generate random integer in [0,RAND_MAX)
LCGBranch.prototype.randomInteger=function(){
    this.seed=(this.seed*LCGBranchA[this.depth]+LCGBranchC[this.depth])%LCGBranchM;
    return this.seed;
};

//Random real number in [0,1).
LCGBranch.prototype.random=function(){
    return this.randomInteger()/LCGBranchM;
};

//Create a new LCG with a new seed (unless this.random_on_branch is false).
LCGBranch.prototype.branch=function(){
    if(this.random_on_branch){
        return new LCGBranch(this.randomInteger(),this.depth+1,this.random_on_branch);
    } else {
        return new LCGBranch(this.seed,this.depth+1,this.random_on_branch);
    }
};

/*
var rg=new LCGBranch();
var outstr="";
for(var i=0;i<10;i++){
    var rg2=rg.branch();
    outstr+="[";
    for(var j=0;j<12;j++){
        outstr+=Math.floor(rg2.random()*1000)/1000+", ";
    }
    outstr+="]\n";
}
console.log(LCGBranchM);
console.log(outstr);*/

module.exports=LCGBranch;
