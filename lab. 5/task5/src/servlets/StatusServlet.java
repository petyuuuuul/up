package servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;


@WebServlet(urlPatterns = {"/status"})
public class StatusServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest request,
						 HttpServletResponse response) throws ServletException, IOException {
	    
		ServletOutputStream out = response.getOutputStream();
	    
		out.println("<!DOCTYPE html><html>");
		out.println("<head><meta charset=\"UTF-8\"><title>Status Servlet</title></head>");
	    
		out.println("<body>");
		out.println("<h1>Application Is Running</h1>");
		out.println("</body>");
		out.println("<html>");
	}
	 
	@Override
	protected void doPost(HttpServletRequest request,
						  HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}
}
