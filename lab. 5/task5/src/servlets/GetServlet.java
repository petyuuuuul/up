package servlets;

import java.io.IOException;
import java.util.Objects;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;


@WebServlet(urlPatterns = {"/get"})
public class GetServlet extends HttpServlet {
	private static final long serialVersionUID = 2L;
	
	@Override
	protected void doGet(HttpServletRequest request,
						 HttpServletResponse response) throws ServletException, IOException {
		ServletOutputStream out = response.getOutputStream();
		
		String name = request.getParameter("name");
		if (Objects.isNull(name)) {
			out.println("<h1>Wrong request</h1>");
			out.println("<p>Try http://localhost:8080/get?name=TESTNAME</p>");
		}
		else {
			out.println("<p>Name is " + name + "</p>");
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest request,
						  HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}
}
