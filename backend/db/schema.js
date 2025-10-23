import db from './connectDB.js';

const createUserTable = async () => {
    await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                name varchar(50) NOT NULL,
                email varchar(254) UNIQUE NOT NULL,
                salt varchar(32) NOT NULL,
                password text NOT NULL
            );
        `);
};

const createProfileTable = async () => {
    await db.query(`
            CREATE TABLE IF NOT EXISTS profile (
                id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id uuid NOT NULL UNIQUE REFERENCES "users"(id) ON DELETE CASCADE,
                profile_image text,
                bio text,
                last_seen timestamptz,
                created_at timestamptz DEFAULT now()
            );
        `);
};

const createConversationTable = async () => {
    await db.query(`
            CREATE TABLE IF NOT EXISTS conversation (
                id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                type conversation_type DEFAULT 'dm'
            )
        `);
};

const createMessagesTable = async () => {
    await db.query(`
            CREATE TABLE IF NOT EXISTS message (
                id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                sender uuid NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
                receiver uuid NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
                conversation_id uuid NOT NULL REFERENCES conversation(id),
                body text,
                media text,
                status message_status NOT NULL DEFAULT 'undelivered',
                created_at timestamptz NOT NULL DEFAULT now()
            );
        `);
};


const createFriendsTable = async () => {
    await db.query(`
            CREATE TABLE IF NOT EXISTS friend (
                user1 uuid NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
                user2 uuid NOT NULL REFERENCES "users"(id) ON DELETE CASCADE,
                status friend_status NOT NULL DEFAULT 'requested',
                conversation_id uuid UNIQUE NULL REFERENCES conversation(id) ON DELETE SET NULL,
                created_at timestamptz NOT NULL DEFAULT now(),
                CONSTRAINT friendship_no_self CHECK (user1 <> user2),
                CONSTRAINT friendship_order CHECK (user1 < user2),
                CONSTRAINT friend_pk PRIMARY KEY (user1, user2)
            );
        `);
};

export const initDB = async () => {
    await createUserTable();
    await createProfileTable();
    await createConversationTable();
    await createMessagesTable();
    await createFriendsTable();
    console.log('All Tables Created');
};