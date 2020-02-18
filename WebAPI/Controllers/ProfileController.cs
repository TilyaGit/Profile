using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ProfileController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"select id, name, age,gender,birthDate,maritalStatus,doYouLikeToProgram from dbo.Profile";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ProfileDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                da.Fill(table);
                cmd.CommandType = CommandType.Text;
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Profile prf)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"insert into dbo.Profile
                (Name,Age,Gender,BirthDate, MaritalStatus, DoYouLikeToProgram)Values
                ('" + prf.Name + @"'
                ,'" + prf.Age + @"'
                ,'" + prf.Gender + @"'
                ,'" + prf.BirthDate + @"'
                ,'" + prf.MaritalStatus + @"'
                ,'" + prf.DoYouLikeToProgram + @"')";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ProfileDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Successfully";
            }
            catch (Exception)
            {

                return "Failed to Add";
            }
        }

        public string Put(Profile prf)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"update dbo.Profile set 
                Name = '" + prf.Name + @"'
                ,Age = '" + prf.Age + @"'
                ,Gender = '" + prf.Gender + @"'
                ,MaritalStatus = '" + prf.MaritalStatus + @"'
                ,DoYouLikeToProgram = '" + prf.DoYouLikeToProgram + @"'
               where ID = " + prf.ID + @"
                          ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ProfileDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Updated Successfully";
            }
            catch (Exception)
            {

                return "Failed to Update";
            }
        }

        public string Delete(int ID)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"delete from dbo.Profile where ID = " + ID;

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ProfileDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Deleted Successfully";
            }
            catch (Exception)
            {

                return "Failed to delete";
            }
        }
    }
}