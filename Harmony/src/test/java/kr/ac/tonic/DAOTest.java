package kr.ac.tonic;

import static org.junit.Assert.*;
import kr.mju.tonic.dao.WorkspaceDAO;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/spring/root-context.xml"})
public class DAOTest {
	private static final Logger log = LoggerFactory.getLogger(DAOTest.class);
	
	@Autowired private WorkspaceDAO workspaceDAO;
	
	@Test(timeout=3000)
	public void WorkspaceDAOTest() {
		// getLastID()
		long lastID = workspaceDAO.getLastID();
		log.info("WorkspaceDAO.getLastID(): " + lastID);
		assertNotNull(lastID);
		assertTrue(lastID >= 1);
		
		// createWorkspace(lastID+1)
		workspaceDAO.createWorkspace(lastID+1);
		assertTrue(lastID+1 == workspaceDAO.getLastID());
		
		// deleteWorkspace(lastID+1)
		workspaceDAO.deleteWorkspace(lastID+1);
		assertTrue(lastID == workspaceDAO.getLastID());
		
		// workspaceDAO.updateWorkspace(1, "[1,2,3,4]");
		workspaceDAO.updateWorkspace(1, "[1,2,3,4]");
		log.info(workspaceDAO.getPuzzleSet(1)); // must be [1,2,3,4]
		
		// workspaceDAO.getPuzzleSet(1);
		assertTrue(workspaceDAO.getPuzzleSet(1).equals("[1,2,3,4]"));
	}
}
