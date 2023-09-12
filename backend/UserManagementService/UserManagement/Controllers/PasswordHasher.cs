using System;
using System.Security.Cryptography;

public class PasswordHasher
{
	public static (string hash, string salt) HashPassword(string password)
	{
		using (var rng = new RNGCryptoServiceProvider())
		{
			byte[] saltBytes = new byte[16];
			rng.GetBytes(saltBytes);

			using (var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA512))
			{
				byte[] hashBytes = pbkdf2.GetBytes(32); // 256 bits
				return (Convert.ToBase64String(hashBytes), Convert.ToBase64String(saltBytes));
			}
		}
	}

	public static bool VerifyPassword(string password, string hash, string salt)
	{
		byte[] saltBytes = Convert.FromBase64String(salt);

		using (var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA512))
		{
			byte[] hashBytes = pbkdf2.GetBytes(32);
			return Convert.ToBase64String(hashBytes) == hash;
		}
	}
}
