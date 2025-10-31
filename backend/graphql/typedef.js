export const typeDefs =
    `
        scalar Date

        enum MessageStatus {
            UNDELIVERED
            DELIVERED
            SEEN
        }

        type User {
            id: ID!
            name: String!
            email: String!
            salt: String!
            password: String!
            profile: Profile!
            message: [Message!]
            unseenMessages: [Message!]
        }

        type Profile {
            userId: ID!
            profileImage: String
            bio: String
            lastSeen: Date
            createdAt: Date!
            user: User!
        }

        type Message {
            id: ID!
            senderId: ID!
            receiverId: ID!
            text: String
            image: String
            status: MessageStatus!
            createdAt: Date!
            count: Int
        }

        type AuthResponse {
            success: Boolean!
            token: String
            user: User
            message: String
        }

        type Query {
            getUserDeatils (id: ID!) : User!
            getUsers: [User!]
            getMessagesForUser (userId: ID!): [Message!]
        }

        type Mutation {
            signup (name: String!, email: String!, password: String!): AuthResponse!
            login (email: String!, password: String!): AuthResponse!
            updateProfile (profileImage: String, bio: String, lastSeen: Date, name: String): Profile!
            getUploadUrl (contentType: String!, path: String!): String!
            sendMessages(receiverId: ID!, text: String, image: String): Message!
        }
`