pragma solidity ^0.5.0;

contract DLibrary {
 
  
    struct Book{
        uint bookID;
        string name;
        string author;
        address payable uploader;
        string bookIpfsHash;
        address payable currentOwner;
      
    }
    
    uint public numOfBooks = 0;
    uint public numOfRentedBooks = 0;
    mapping(uint => Book) public allBooksAvailable;
    mapping(uint => Book) public allBooksRented;
    
    address payable public currentUser = msg.sender;
    
   

  event BookAdded(
    uint bookID,
   string name,
   string author,
   address payable uploader,
   string bookIpfsHash,
   address payable currentOwner
  );
    
    function addBook(string memory _name,string memory _author,address payable _uploader,string memory _bookIpfsHash) public{
        require(msg.sender!=address(0));  // msg.sender is the one adding a book
       numOfBooks++;
       allBooksAvailable[numOfBooks]=Book(numOfBooks,_name,_author,_uploader,_bookIpfsHash,address(0));
        
        emit BookAdded(numOfBooks,_name,_author,msg.sender,_bookIpfsHash,address(0));
    
    }
    
    event ownedBook(
     uint bookID,
     string name,
     string author,
     string bookIpfsHash,
     address payable ownedBy
        );
    function borrowBook(uint _bookID)public {
  
        numOfRentedBooks++;
  
            numOfBooks--;
         //   rentedBooks[currentUser.numOfPossessions] = allBooksAvailable[_bookID];
            Book memory rentedBook;
            rentedBook.bookID=_bookID;
            rentedBook.name=allBooksAvailable[_bookID].name;
            rentedBook.author=allBooksAvailable[_bookID].author;
            rentedBook.uploader=allBooksAvailable[_bookID].uploader;
            rentedBook.bookIpfsHash=allBooksAvailable[_bookID].bookIpfsHash;
            rentedBook.currentOwner=msg.sender;
            
            allBooksRented[numOfRentedBooks] = rentedBook;
  
        
        for(uint i=1;i<=numOfBooks;i++){
            if(allBooksAvailable[i].bookID==_bookID){
                delete(allBooksAvailable[i]);
                break;
            }
        }
       
        emit ownedBook(_bookID,allBooksRented[numOfRentedBooks].name,
      allBooksRented[numOfRentedBooks].author,allBooksRented[numOfRentedBooks].bookIpfsHash,msg.sender);
        
  
    }
    
    
    
   
    
    
   
 
}