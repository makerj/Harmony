package kr.mju.tonic;

import kr.mju.tonic.service.WorkspaceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {
	@Autowired
	private WorkspaceService service;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {return "home";}
	
	@RequestMapping(value = "/newProject", method = RequestMethod.GET)
	public String newProject() {
		return "redirect:/workspace?id=" + service.newWorkspace();
	}
}
