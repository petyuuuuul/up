package filters;

import java.util.Date;
import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;


@WebFilter(urlPatterns = {"*"})
public class MainFilter implements Filter {
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, 
						 ServletResponse response, 
						 FilterChain chain) throws IOException, ServletException {
		long ms = 0 - (new Date()).getTime();
		chain.doFilter(request, response);
		ms += (new Date()).getTime();
		
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		System.out.print(httpRequest.getMethod() + " - ");
		System.out.print(httpRequest.getRequestURL() + " - ");
		System.out.println(ms + "ms");
	}

	@Override
	public void destroy() {		
	}
}
