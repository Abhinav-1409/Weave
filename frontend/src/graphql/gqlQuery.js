import { gql } from "@apollo/client"

export const GET_USERS =
    gql`query GetUsers {
        getUsers {
            email
            name
            id    
        }
}`

export const GET_USER_WITH_UNSEEN_MESSAGES =
    gql`query getUsersAndUnseenMessages {
        getUsers {
            email
            name
            id
            unseenMessages {
            media
            sender
            receiver
            createdAt
            }
        }
} `

export const GET_MESSAGES_FOR_SELECTED_USER =
    gql`query getMessage($userId: ID!){
        getMessagesForUser(userId: userId){
            sender
            receiver
            createdAt
            body
            media
        }
    }

    `