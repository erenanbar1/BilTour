# CS319 S2T6 Project Non-Functional Requirements

## Dependability:
The system shall be as dependable as the server it is deployed on. The server for our system is not yet known but is expected to be on a usable dependability level.

## Scalability & Performance:
The system is not expected to hold more than 50 users and 500 tour records. These numbers are not expected to overwhelm any modern system.

## Availability & Maintainability:
The system should be available from 7am till 7pm. At other times system can be put down for maintenance.
The maximum down time should not exceed 15 minutes.

## Usability:
Most users will have very few actions on our system making it accessible for use with few distractions.

## Portability:
Our system will be a web system and our priority will be making it usable for computers with chrome and firefox browsers. If time allows we will also do our best to make the system accessible for phone use on safari, firefox and chrome however as web development goes most probably this will be too timely to handle and so we can give no guarantees.

## Privacy:
Our project should not hold any personal information except for student ID's, names, free times (as provided by user) and attended tours.
All this information should be held in encrypted format using the AES 256 encryption algorithm.
The system will be KVKK sufficient if to be deployed for future use on Turkish servers, however for this class's purpose there is a high likelihood international servers will be used making it impractical for KVKK laws to be followed. 
Student ID information should only be disclosed to the admin, secretary and coordinator.
Guide and trainee guide names and free times should only be disclosed to the admin, secretary, coordinator and advisors.

## Security:
Registry will not be an available option for this system making it inaccessible by outside parties if not entered through a registered account.
Authentication for our system will be Django's built in authentication system making it practically unpassable except for credential stealing.
MFA will not be used. It is an easy fix for an already deployed system but is hard to implement on a prototype like project.
Password storage will be left to Django if applicable, if not SHA-3 will be used as the hash function and passwords will be calculated by passing user number + password (user number used as salt).
