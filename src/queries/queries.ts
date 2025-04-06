export default [
    // Users table
    `CREATE TABLE public.users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(100),
        bio TEXT,
        profile_picture_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
    )`,

    // Posts table
    `CREATE TABLE public.posts (
        post_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id),
        content TEXT NOT NULL,
        image_url VARCHAR(255),
        location VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        privacy_setting VARCHAR(20) DEFAULT 'public',
        likes_count INTEGER DEFAULT 0
    )`,

    // Comments table
    `CREATE TABLE public.comments (
        comment_id SERIAL PRIMARY KEY,
        post_id INTEGER REFERENCES posts(post_id),
        user_id INTEGER REFERENCES users(user_id),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        parent_comment_id INTEGER REFERENCES comments(comment_id)
    )`,

    // Likes table
    `CREATE TABLE public.likes (
        like_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id),
        post_id INTEGER REFERENCES posts(post_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, post_id)
    )`,

    // Friendships table
    `CREATE TABLE public.friendships (
        friendship_id SERIAL PRIMARY KEY,
        user_id1 INTEGER REFERENCES users(user_id),
        user_id2 INTEGER REFERENCES users(user_id),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id1, user_id2)
    )`,

    // Groups table
    `CREATE TABLE public.groups (
        group_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        created_by INTEGER REFERENCES users(user_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        privacy_setting VARCHAR(20) DEFAULT 'public'
    )`,

    // Group_Members table
    `CREATE TABLE public.group_members (
        group_id INTEGER REFERENCES groups(group_id),
        user_id INTEGER REFERENCES users(user_id),
        role VARCHAR(20) DEFAULT 'member',
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (group_id, user_id)
    )`,

    // Messages table
    `CREATE TABLE public.messages (
        message_id SERIAL PRIMARY KEY,
        sender_id INTEGER REFERENCES users(user_id),
        receiver_id INTEGER REFERENCES users(user_id),
        content TEXT NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        read_at TIMESTAMP
    )`,

    // Hashtags table
    `CREATE TABLE public.hashtags (
        hashtag_id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    // Post_Hashtags table
    `CREATE TABLE public.post_hashtags (
        post_id INTEGER REFERENCES posts(post_id),
        hashtag_id INTEGER REFERENCES hashtags(hashtag_id),
        PRIMARY KEY (post_id, hashtag_id)
    )`,

    // Sample Data Insertions
    `INSERT INTO users (username, email, password_hash, full_name, bio) VALUES 
    ('john_doe', 'john@example.com', 'hash123', 'John Doe', 'Living life to the fullest'),
    ('jane_smith', 'jane@example.com', 'hash456', 'Jane Smith', 'Travel enthusiast'),
    ('mike_wilson', 'mike@example.com', 'hash789', 'Mike Wilson', 'Photography lover'),
    ('sarah_brown', 'sarah@example.com', 'hash101', 'Sarah Brown', 'Tech geek'),
    ('alex_garcia', 'alex@example.com', 'hash202', 'Alex Garcia', 'Sports fanatic')`,

    `INSERT INTO posts (user_id, content, location) VALUES 
    (1, 'Beautiful sunset today! #nature', 'Beach City'),
    (2, 'Just finished my first marathon! #running', 'Central Park'),
    (3, 'New camera, new adventures! #photography', 'Mountain View'),
    (4, 'Working on a cool project #coding', 'Tech Hub'),
    (5, 'Game day! #sports', 'Stadium')`,

    `INSERT INTO comments (post_id, user_id, content) VALUES 
    (1, 2, 'Stunning view!'),
    (1, 3, 'Great shot!'),
    (2, 1, 'Congratulations!'),
    (3, 4, 'What camera did you get?'),
    (4, 5, 'Looks interesting!')`,

    `INSERT INTO likes (user_id, post_id) VALUES 
    (2, 1),
    (3, 1),
    (4, 1),
    (1, 2),
    (5, 3)`,

    `INSERT INTO friendships (user_id1, user_id2, status) VALUES 
    (1, 2, 'accepted'),
    (1, 3, 'accepted'),
    (2, 3, 'accepted'),
    (4, 5, 'pending'),
    (3, 5, 'accepted')`
]
