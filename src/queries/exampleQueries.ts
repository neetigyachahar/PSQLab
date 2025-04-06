const exampleQueries = [
    {
        name: "View tables schema",
        query: "SELECT * FROM information_schema.tables where table_name not like '%pg_%'"
    },
    {
        name: "Basic JOIN - Find all posts with their authors",
        query: "SELECT p.post_id, p.content, u.username, u.full_name FROM posts p JOIN users u ON p.user_id = u.user_id"
    },
    {
        name: "Aggregation & GROUP BY - Post engagement statistics",
        query: `SELECT p.post_id, p.content, 
                COUNT(DISTINCT c.comment_id) as comment_count,
                COUNT(DISTINCT l.like_id) as like_count
                FROM posts p
                LEFT JOIN comments c ON p.post_id = c.post_id
                LEFT JOIN likes l ON p.post_id = l.post_id
                GROUP BY p.post_id, p.content
                ORDER BY comment_count DESC`
    },
    {
        name: "Subquery - Users with more than average likes",
        query: `SELECT u.username, COUNT(l.like_id) as total_likes
                FROM users u
                JOIN posts p ON u.user_id = p.user_id
                JOIN likes l ON p.post_id = l.post_id
                GROUP BY u.username
                HAVING COUNT(l.like_id) > (
                    SELECT AVG(like_count) FROM (
                        SELECT COUNT(like_id) as like_count
                        FROM likes
                        GROUP BY post_id
                    ) as avg_likes
                )`
    },
    {
        name: "SELF JOIN - Mutual friendships",
        query: `SELECT u1.username as user1, u2.username as user2
                FROM friendships f
                JOIN users u1 ON f.user_id1 = u1.user_id
                JOIN users u2 ON f.user_id2 = u2.user_id
                WHERE f.status = 'accepted'
                ORDER BY u1.username`
    },
    {
        name: "Complex JOIN with WHERE - Active users with posts and comments",
        query: `SELECT DISTINCT u.username, u.full_name,
                p.content as last_post,
                c.content as last_comment
                FROM users u
                JOIN posts p ON u.user_id = p.user_id
                JOIN comments c ON u.user_id = c.user_id
                WHERE EXISTS (
                    SELECT 1 FROM likes l
                    WHERE l.user_id = u.user_id
                )`
    }
]

export default exampleQueries
