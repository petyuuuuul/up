package servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;


@WebServlet(urlPatterns = {"/check"})
public class checkServlet extends HttpServlet {
	private static final long serialVersionUID = 3L;
	
	@Override
	protected void doPost(HttpServletRequest request,
						  HttpServletResponse response) throws ServletException, IOException {
		ServletOutputStream out = response.getOutputStream();
		response.setContentType("application/json");
		out.println("{\"check\": true}");
	}
}
