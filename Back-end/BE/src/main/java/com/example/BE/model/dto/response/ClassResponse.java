package com.example.BE.model.dto.response;

import com.example.BE.model.entity.Class;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class ClassResponse {
    protected int classId;

    protected String className;

    protected String classCode;

    protected java.util.Date duration;

    protected String status;

    protected String location;

    protected String fsu;

    protected java.util.Date start_date;

    protected java.util.Date end_date;

    protected String create_by;

    protected java.util.Date createdDate;

    protected Date modified_date;

    protected String modified_by;

    protected int TrainingProgram_id;
    public ClassResponse(Class classEntity) {
        this.classId = classEntity.getClassID();
        this.className = classEntity.getClassName();
        this.classCode = classEntity.getClassCode();
        this.duration = classEntity.getDuration();
        this.status = classEntity.getStatus();
        this.location = classEntity.getLocation();
        this.fsu = classEntity.getFsu();
        this.start_date = classEntity.getStart_date();
        this.end_date = classEntity.getEnd_date();
        this.create_by = classEntity.getCreate_by();
        this.createdDate = classEntity.getCreatedDate();
        this.modified_date = classEntity.getModified_date();
        this.modified_by = classEntity.getModified_by();
        this.TrainingProgram_id = classEntity.getProgram_class().getTraining_code();
    }

    public ClassResponse(int classId, String className, String classCode, Date duration, String status, String location, String fsu, Date start_date, Date end_date, String create_by, Date createdDate, Date modified_date, String modified_by, int trainingProgram_id) {
        this.classId = classId;
        this.className = className;
        this.classCode = classCode;
        this.duration = duration;
        this.status = status;
        this.location = location;
        this.fsu = fsu;
        this.start_date = start_date;
        this.end_date = end_date;
        this.create_by = create_by;
        this.createdDate = createdDate;
        this.modified_date = modified_date;
        this.modified_by = modified_by;
        TrainingProgram_id = trainingProgram_id;
    }
    public ClassResponse() {

    }
}
