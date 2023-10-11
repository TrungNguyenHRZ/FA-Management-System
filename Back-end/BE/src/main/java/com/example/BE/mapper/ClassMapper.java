package com.example.BE.mapper;

import com.example.BE.model.dto.ClassDTO;
import com.example.BE.model.entity.Class;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
@Mapper(componentModel = "spring")
public interface ClassMapper {
    @Mapping(source = "class1.classID", target = "classID")
    @Mapping(source = "class1.className", target = "className")
    @Mapping(source = "class1.classCode", target = "classCode")
    @Mapping(source = "class1.duration", target = "duration")
    @Mapping(source = "class1.status", target = "status")
    @Mapping(source = "class1.location", target = "location")
    @Mapping(source = "class1.fsu", target = "fsu")
    @Mapping(source = "class1.start_date", target = "start_date")
    @Mapping(source = "class1.end_date", target = "end_date")
    @Mapping(source = "class1.create_by", target = "create_by")
    @Mapping(source = "class1.createdDate", target = "createdDate")
    @Mapping(source = "class1.modified_by", target = "modified_by")
    @Mapping(source = "class1.modified_date", target = "modified_date")
    ClassDTO toClassDTO(Class class1);

    List<ClassDTO> toClassDTOList(List<Class> classes);
}
