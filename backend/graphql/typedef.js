export const typeDefs =
    `
        scalar Date

        enum FriendStatus {
            REQUESTED
            FRIEND
        }
        enum ConversationType {
            DM
            GROUP
        }
        enum MessageStatus {
            UNDELIVERED
            DELIVERED
        }

        type User {
            id: ID!
            name: String!
            email: String!
            salt: String!
            password: String!
            profile: Profile!
            friend: [Friend!]
        }
        type Profile {
            id: ID!
            userId: User!
            profileImage: String
            bio: String
            lastSeen: Date
            createdAt: Date!
            user: User!
        }
        type Conversation {
            id: ID!
            type: ConversationType
            messages: [Message!]!
            createdAt: Date! 
        }
        type Message {
            id: ID!
            sender: User!
            receiver: User!
            conversationId: Conversation!
            body: String
            media: String
            status: MessageStatus!
            createdAt: Date!
        }
        type Friend {
            user1: User!
            user2: User!
            status: FriendStatus!
            conversationId: Conversation
            createdAt: Date!
            user: User!
        }


        type AuthResponse {
            success: Boolean!
            token: String
            user: User
            message: String
        }

        type Query {
            getUserDeatils (email: String!) : User!
            getUserProfile (user_id: ID!) : Profile!
        }

        type Mutation {
            signup (name: String!, email: String!, password: String!): AuthResponse!
            login (email: String!, password: String!): AuthResponse!
            updateProfile (profileImage: String, bio: String, lastSeen: Date, name: String): Profile!
            updateProfileImage (contentType: String!): String!
        }
`