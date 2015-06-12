package kr.mju.tonic.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet Filter implementation class AJAXFilter
 */
public class AJAXFilter implements Filter {
    public AJAXFilter() {}
	public void destroy() {}
	public void init(FilterConfig fConfig) throws ServletException {}
	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletResponse res = (HttpServletResponse) response;
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setCharacterEncoding("utf-8");
		
		// pass the request along the filter chain
		chain.doFilter(request, response);
	}
}
