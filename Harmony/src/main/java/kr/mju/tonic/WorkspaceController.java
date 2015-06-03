package kr.mju.tonic;

import javax.servlet.http.HttpServletRequest;

import kr.mju.tonic.service.WorkspaceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WorkspaceController {
	@Autowired
	private WorkspaceService service;
	
	@RequestMapping(value = "/workspace", method = RequestMethod.GET)
	public String workspace(HttpServletRequest request, Model model) {
		long id;
		try {
			id = Long.parseLong(request.getParameter("id"));
		} catch (Exception e) {e.printStackTrace(); return "redirect:/";}

		model.addAttribute("id", id);
		model.addAttribute("puzzleSet", service.getPuzzleSet(id));
		return "main";
	}
}
