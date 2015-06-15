package kr.mju.tonic;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.mju.tonic.service.WorkspaceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class WorkspaceController {
	@Autowired
	private WorkspaceService service;
	
	@RequestMapping(value = "newProject", method = RequestMethod.GET)
	public String newProject(Model model) {
		return "redirect:/workspace?id=" + service.newWorkspace();
	}
	
	@RequestMapping(value = "workspace", method = RequestMethod.GET)
	public ModelAndView workspace(HttpServletRequest request, HttpServletResponse response) throws IOException {
		ModelAndView mv = new ModelAndView("main");
		long workspaceID = 0;
		try {
			workspaceID = Long.parseLong(request.getParameter("id"));
		} catch (Exception e) {response.sendRedirect("/");}
		mv.addObject("workspace_id", workspaceID);
		mv.addObject("savedState", service.getPuzzleSet(workspaceID));
		return mv;
	}
	
	@RequestMapping(value = "saveWorkspace", method = RequestMethod.POST)
	public void saveWorkspace(@RequestParam("workspace_id")long id, @RequestParam("savedState")String state,
			HttpServletResponse response) throws IOException {
		service.updatePuzzleSet(id, state);
		response.getWriter().println("fine");
	}
}
