package servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;


@WebServlet(urlPatterns = {"/test2"})
public class RedirectServlet extends HttpServlet {
	private static final long serialVersionUID = 6L;
	
	@Override
	protected void doGet(HttpServletRequest request,
						 HttpServletResponse response) throws ServletException, IOException {
		response.sendRedirect(request.getContextPath() + "/page");
	}
	
	@Override
	protected void doPost(HttpServletRequest request,
						  HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}
}
