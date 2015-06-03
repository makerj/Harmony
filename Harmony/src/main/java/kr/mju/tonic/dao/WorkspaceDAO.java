package kr.mju.tonic.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class WorkspaceDAO {
	@Autowired
	private JdbcTemplate jt;
	
	public void createWorkspace(long id) {
		try {
			jt.update("INSERT INTO harmony.workspace VALUES(?,'')", new Object[]{id});
		} catch (Exception e) {e.printStackTrace();}
	}
	
	public Long getLastID() {
		long id = -1;
		try {
			id = jt.queryForLong("SELECT MAX(id) FROM harmony.workspace");
		} catch (Exception e) {e.printStackTrace();}
		return id;
	}
	
	public void updateWorkspace(long id, String puzzleSet) {
		try {
			jt.update("UPDATE harmony.workspace SET puzzleSet=? WHERE id=?", new Object[]{puzzleSet, id});
		} catch (Exception e) {e.printStackTrace();}
	}
	
	public String getPuzzleSet(long id) {
		String result = "";
		
		try {
			result = jt.queryForObject("SELECT puzzleSet FROM harmony.workspace WHERE id=?", new Object[]{id},
					new RowMapper<String>() {
				@Override
				public String mapRow(ResultSet rs, int count) throws SQLException {
					return rs.getString(1);
				}
			});
		} catch (Exception e) {e.printStackTrace();}
		
		return result;
	}
	
	public void deleteWorkspace(long id) {
		try {
			jt.update("DELETE FROM harmony.workspace WHERE id=?", new Object[]{id});
		} catch (Exception e) {e.printStackTrace();}
	}
}
