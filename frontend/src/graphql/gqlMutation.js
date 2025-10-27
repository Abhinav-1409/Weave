import { gql } from "@apollo/client"

export const loginMutation = 
gql`mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        user {
            email
            name
            id
        }
        message
        token
        success
    }
}`;

export const signupMutation = gql`
    mutation Mutation($email: String!, $password: String!, $name: String!) {
        signup(name: $name, email: $email, password: $password) {
            success
            message
        }
    }`;
