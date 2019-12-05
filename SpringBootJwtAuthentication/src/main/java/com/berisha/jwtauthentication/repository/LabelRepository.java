package com.berisha.jwtauthentication.repository;

import com.berisha.jwtauthentication.model.Label;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabelRepository extends JpaRepository<Label,Long> {
    Label findByName(String name);
}
