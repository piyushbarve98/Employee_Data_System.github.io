
  //config for connectivity to the firestore
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC_Fs3iu-Q5AKO_BfAQAJwgwPb68U7HrpM",
    authDomain: "employee-data-system-9f2aa.firebaseapp.com",
    databaseURL: "https://employee-data-system-9f2aa.firebaseio.com",
    projectId: "employee-data-system-9f2aa",
    storageBucket: "employee-data-system-9f2aa.appspot.com",
    messagingSenderId: "158926625733",
    appId: "1:158926625733:web:5d71013b09a7c1d3f509ac",
    measurementId: "G-6BCZQ4ZF3C"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();


  function insertData(){

      let form = document.querySelector('.insert-form');
      form.addEventListener('submit',(e)=>{
        e.preventDefault();
        db.collection('employees').add({
            name: form.name.value,
            email: form.email.value,
            age: form.age.value,
            salary: form.salary.value
          }).then(()=>{
              alert('Data Uploaded');
              location.href= 'homePage.html';
          });

      })
      
  }

  function delData(){
    let form = document.querySelector('.delete-form');

    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        db.collection('employees').where('name','==',form.name.value).where('email','==',form.email.value).get().then(snapshot=>{

          if(!(snapshot.empty)){
          snapshot.forEach(doc=>{
                doc.ref.delete().then(()=>{
                    alert('Item deleted succesfully');
                    location.href='homePage.html';
                }).catch(error=>{
                  alert('Error removing data');
                });
            });
          }
          else{
            alert('No such data is availaible');
          }
        }).catch(error=>{
          console.log(error);
        });
        
    });


  }


  // function for showing the data user demanded 
  function showProfile(data){
    let form = document.querySelector('.nameId-form');
    form.style.display = 'none';
    let profile = document.querySelector('.profile');
    profile.style.display = 'block';
    let ul = document.querySelector('.profile-ul');

    let liAll = document.querySelectorAll('li');
    let arr = ['name','email','age','salary'];
    let i=0;
    liAll.forEach(li=>{
      li.textContent = arr[i].toUpperCase() +":    " +  data[arr[i]];
      i= i+1;
    });

    
  

    
    
    

  }


  function getData(){

    let form = document.querySelector('.nameId-form');
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      db.collection('employees').where('name','==',form.name.value).where('email','==',form.email.value).get().then(snapshot=>{
          snapshot.forEach(doc=>{
            showProfile(doc.data());
          });
    });
    });
    
  }