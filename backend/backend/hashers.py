from django.contrib.auth.hashers import PBKDF2PasswordHasher

class MyFasterPBKDF2PasswordHasher(PBKDF2PasswordHasher):
    """
    Custom PBKDF2 password hasher with reduced iterations (20,000 instead of default 600,000).
    This dramatically speeds up logins/signups on throttled free-tier hosting (like Render)
    where password hashing can take 5-10 seconds of CPU time, while still maintaining
    a safe level of cryptographic protection.
    """
    iterations = 20000
