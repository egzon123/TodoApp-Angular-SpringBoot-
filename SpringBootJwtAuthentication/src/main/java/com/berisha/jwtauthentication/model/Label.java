package com.berisha.jwtauthentication.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.awt.*;

@Entity
@Data
@NoArgsConstructor
public class Label {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Color color;

    @ManyToOne
    private Todo todo;

}
