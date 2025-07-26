import {gql} from "@apollo/client";


const LOGIN_USER=gql`
    
   mutation Login($input: LoginInput!){
   login(input:$input){
   id,
   success}
   }
`;