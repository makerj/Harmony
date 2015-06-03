package kr.mju.tonic.service;

import java.util.concurrent.atomic.AtomicLong;

import kr.mju.tonic.dao.WorkspaceDAO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkspaceService {
	private WorkspaceDAO dao;
	private final AtomicLong ID_COUNTTER;
	private static final Logger logger = LoggerFactory.getLogger(WorkspaceService.class);

	@Autowired
	public WorkspaceService(WorkspaceDAO dao) {
		this.dao = dao;
		this.ID_COUNTTER = new AtomicLong(dao.getLastID()+1);
	}

	public long createWorkspace() {
		return newWorkspace();
	}
	
	public long newWorkspace() {
		long id = ID_COUNTTER.getAndIncrement();
		dao.createWorkspace(id);
		logger.debug("Current workspace ID: " + id);
		return id;
	}
	
	public void deleteWorkspace(long id) {
		dao.deleteWorkspace(id);
	}
	
	public String getPuzzleSet(long id) {
		return dao.getPuzzleSet(id);
	}
	
	public void updatePuzzleSet(long id, String puzzleSet) {
		dao.updateWorkspace(id, puzzleSet);
	}
}
