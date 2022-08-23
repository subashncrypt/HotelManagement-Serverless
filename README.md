![image](https://user-images.githubusercontent.com/48622120/186059214-91c4e961-edf4-4b25-8697-278e48c4f73a.png)
4.	Implementation Details

4.1.	User Management Module

4.1.1 Brief

The cloud-based hotel registration system allows users to register, book available rooms, and select extras like dining. The hotel administration component of the application accepts registrations and generates bills based on the quantity of meals consumed, the number of nights spent there, and other considerations. The two types of users are approved users and invited users. Customers who are guests can browse the basic application navigation and check the hotel's availability. Additionally, authorized hotel guests may make bookings, order meals, and access other features. Before booking a room, you must register. Users who return are not required to re-register. The user will be given a customer number after registration that is supported by the hotel reservation. Users' personal data is controlled and saved.
To store the user details, we have used the AWS Cognito which can be used to later authorize the user, the security questions are also gathered from the user and stored in Google fire store along with the cipher key, a cloud function can be used to validate the cipher key and cipher text [7].
4.1.2 Service Used

AWS Cognito: For user registration and authentication.
AWS DynamoDB: For storing user information and dynamically created customer ID.
GCP Fire Store: To store security questions and ceaser cipher key of user.
4.1.3 Pseudo code

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
