
Implementation Details

1.	User Management Module

Architecture
![image](https://user-images.githubusercontent.com/48622120/186059214-91c4e961-edf4-4b25-8697-278e48c4f73a.png)

1.1 Brief

The cloud-based hotel registration system allows users to register, book available rooms, and select extras like dining. The hotel administration component of the application accepts registrations and generates bills based on the quantity of meals consumed, the number of nights spent there, and other considerations. The two types of users are approved users and invited users. Customers who are guests can browse the basic application navigation and check the hotel's availability. Additionally, authorized hotel guests may make bookings, order meals, and access other features. Before booking a room, you must register. Users who return are not required to re-register. The user will be given a customer number after registration that is supported by the hotel reservation. Users' personal data is controlled and saved.

To store the user details, we have used the AWS Cognito which can be used to later authorize the user, the security questions are also gathered from the user and stored in Google fire store along with the cipher key, a cloud function can be used to validate the cipher key and cipher text [7].

1.2 Service Used

AWS Cognito: For user registration and authentication.
AWS DynamoDB: For storing user information and dynamically created customer ID.
GCP Fire Store: To store security questions and ceaser cipher key of user.

1.3 Pseudo code

•	The user fills out the registration page's details.
•	Password and email are saved in AWS Cognito.
•	For authentication, an email is sent to the main email address entered.
•	DynamoDB stores user data such first and last names, emails, and phone numbers.
•	Along with emails, security questions and cypher keys are saved in the Google Fire store.
•	The user is sent to the login page by the system upon successful registration.
The first step is to set of the configuration of Cognito and AWS dynamo DB along with the fire store to insert data into the data base.
![image](https://user-images.githubusercontent.com/48622120/186059294-d84dcb40-217e-4efb-b557-3ff2e7abdcea.png)
Users can register into our application through the registration form the registration information is then gathered and inserted into DynamoDb and uploaded into Cognito awaiting confirmation of the registered email once registered.
Here is the list of registered users in the Cognito
Here is the list of registered users in the Cognito
 ![image](https://user-images.githubusercontent.com/48622120/186059358-1d3eb56b-23a9-45b0-b95b-03eb1bebe438.png)
Figure 4.1.4.2 Workflow of user management module
Here is the picture of dynamo db. table where user information has been added with all the user details using email id, generated id, last name and password.
 ![image](https://user-images.githubusercontent.com/48622120/186059373-304ebe79-e59b-470b-b4f2-8b52154c0e10.png)
Figure 4.1.4.3 Data inserted into Dynamo DB table.

2.	Authentication Module

2.1.	Overview

This module focuses on the authentication part of the user. It basically authenticates the user using 3 step verification i.e., 3 Factor Authentication. The steps are:
1.	The first step is the traditional Username and Password login. This step will be using AWS Cognito to authenticate the user and generate a JWT token. Along with this, the application will also fetch the user data from DynamoDB. Upon successful authentication, we move ahead to the next step.
2.	The second step involves answering of a security question. The answers to these questions are stored in Firestore while registering along with the email of the user and the cipher key. These data are fetched and verified if the answered question match the one in database. Upon failure, the app will redirect the user back to the first step. Upon successful verification, the user moves on to the next step.
3.	The third and the final step is to decipher a randomly generated series of 3 letters using the Caesar Cipher Algorithm. The key for the decryption would be taken from the user while registering. The user will be redirected to Step 1 if the authentication fails. Upon successful authentication, the token which was generated in the first step by Cognito will be stored in the local storage of the browser along with the user data.


2.2.	Architecture and Workflow
![image](https://user-images.githubusercontent.com/48622120/186284105-db6b44c1-e7b1-49f5-a55b-5ecebf8eb77d.png)

2.3.	Pseudo Code
Step 1: Login – AWS Cognito
![image](https://user-images.githubusercontent.com/48622120/186284176-4bd8349d-60cf-4556-90f1-bb8f3b04fccd.png)

Step 2: Security Question
![image](https://user-images.githubusercontent.com/48622120/186284213-ed4c3b16-e72f-4064-8d32-1181397c2cd8.png)

Step 3: Caesar Cipher	
![image](https://user-images.githubusercontent.com/48622120/186284229-18e77a65-3bac-42f1-a594-4341462b0648.png)

