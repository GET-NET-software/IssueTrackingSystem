namespace UserManagement.Models
{
	public class AuthenticationResponse
	{
		public string UserName { get; set; }
		public string JwtToken { get; set; }
		public int CompanyId { get; set; }
		public int ExpiresIn { get; set; }
	}
}