package kr.mju.tonic;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.mju.tonic.service.WorkspaceService;
import kr.mju.tonic.webhelper.Defines;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.JsonObject;

@Controller
public class AJAXController {
	@Autowired
	private WorkspaceService service;
	
	@RequestMapping(value = "ajax/loadWorkspace", method = RequestMethod.GET)
	public void loadWorkspace(HttpServletRequest request, HttpServletResponse response) throws IOException {
		long id = 0;
		try {
			id = Long.parseLong(request.getParameter("id"));
		} catch (Exception e) {e.printStackTrace();}

		JsonObject json = new JsonObject();
		json.addProperty("workspace_id", id);
		json.addProperty("savedState", service.getPuzzleSet(id));
		
		response.getWriter().write(json.toString());
	}
	
	@RequestMapping(value = "ajax/saveWorkspace", method = RequestMethod.POST)
	public void saveWorkspace(@RequestParam("workspace_id")long id, @RequestParam("savedState")String state,
			HttpServletResponse response) throws IOException {
		service.updatePuzzleSet(id, state);
		response.getWriter().println("fine");
	}
	
	@RequestMapping(value = "ajax/getMusicList", method = RequestMethod.GET)
	public void getMusicList(HttpServletResponse response) throws IOException {
		File audioDir = new File(Defines.LOCAL_WEBAPP_ROOT_PATH, "resources/audio");
		JsonObject json = new JsonObject();
		
		for (File e : audioDir.listFiles()) {
			String curName = e.getName();
			int id = Integer.parseInt(curName.substring(curName.lastIndexOf("_")+1, curName.lastIndexOf(".")));
			json.addProperty(id+"", curName);	
		}
		response.getWriter().write(json.toString());
	}
}
