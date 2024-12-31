// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Certi{
    struct Certificate{
        string name;
        string course;
        string grade;
        string date;
    }
        address admin ;

    mapping (uint256 _id => Certificate)public Certificates;

    constructor(){
        admin=msg.sender;
    }
    modifier onlyAdmin(){
        require(msg.sender==admin,"Unauthorized");
        _;
    }

    function issue(uint256 _id,string memory _name,string memory _coures,string memory _grade,string memory _date)public onlyAdmin{
            Certificates[_id]=Certificate(_name,_coures,_grade,_date);
    }
    function getCertificate(uint256 _id) public view returns (Certificate memory) {
        return Certificates[_id];
    }
}