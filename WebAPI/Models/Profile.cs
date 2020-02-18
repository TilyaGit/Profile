using System;

namespace WebAPI.Models
{
    public class Profile
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public string MaritalStatus { get; set; }
        public bool DoYouLikeToProgram { get; set; }
    }
    //public enum Gender
    //{
    //    Male = 1,
    //    Female = 2
    //}
    //public enum MaritalStatus
    //{
    //    Married = 1,
    //    Single = 2
    //}
}