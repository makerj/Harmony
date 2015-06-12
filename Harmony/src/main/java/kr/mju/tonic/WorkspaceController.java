package kr.mju.tonic;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.mju.tonic.service.WorkspaceService;
import kr.mju.tonic.webhelper.Defines;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.JsonObject;

@Controller
public class WorkspaceController {
	@Autowired
	private WorkspaceService service;
	
	@RequestMapping(value = "newProject", method = RequestMethod.GET)
	public String newProject(Model model) {
		return "redirect:/workspace?id=" + service.newWorkspace();
	}
	
	@RequestMapping(value = "workspace", method = RequestMethod.GET)
	public void workspace(HttpServletRequest request, HttpServletResponse response) throws IOException {
		long id = 0;
		try {
			id = Long.parseLong(request.getParameter("id"));
		} catch (Exception e) {e.printStackTrace();}

		JsonObject json = new JsonObject();
		json.addProperty("workspace_id", id);
		json.addProperty("savedState", service.getPuzzleSet(id));
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.getWriter().write(json.toString());
	}
	
	@RequestMapping(value = "saveWorkspace", method = RequestMethod.POST)
	public void saveWorkspace(@RequestParam("workspace_id")long id, @RequestParam("savedState")String state,
			HttpServletResponse response) throws IOException {
		System.out.println(id);
		System.out.println(state);
		service.updatePuzzleSet(id, state);
		response.getWriter().println("fine");
	}
	
	@RequestMapping(value = "getMusicList", method = RequestMethod.GET)
	public void getMusicList(HttpServletResponse response) throws IOException {
		File audioDir = new File(Defines.LOCAL_WEBAPP_ROOT_PATH, "resources/audio");
		JsonObject json = new JsonObject();
		
		for (File e : audioDir.listFiles()) {
			String curName = e.getName();
			int id = Integer.parseInt(curName.substring(curName.lastIndexOf("_")+1, curName.lastIndexOf(".")));
			json.addProperty(id+"", curName);	
		}
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(json.toString());
	}
}
