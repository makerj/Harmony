package kr.mju.tonic;

import javax.servlet.http.HttpServletRequest;

import kr.mju.tonic.service.WorkspaceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WorkspaceController {
	@Autowired
	private WorkspaceService service;
	
	@RequestMapping(value = "newProject", method = RequestMethod.GET)
	public String newProject(Model model) {
		return "redirect:/workspace?id=" + service.newWorkspace();
	}
	
	@RequestMapping(value = "workspace", method = RequestMethod.GET)
	public String workspace(HttpServletRequest request, Model model) {
		long id;
		try {
			id = Long.parseLong(request.getParameter("id"));
		} catch (Exception e) {e.printStackTrace(); return "redirect:/";}

		model.addAttribute("workspace_id", id);
		model.addAttribute("puzzleSet", service.getPuzzleSet(id));
		return "main";
	}
	
	@RequestMapping(value = "saveWorkspace", method = RequestMethod.POST)
	public void saveWorkspace(@RequestParam("workspace_id")long id, @RequestParam("state")String state) {
		service.updatePuzzleSet(id, state);
	}
}
