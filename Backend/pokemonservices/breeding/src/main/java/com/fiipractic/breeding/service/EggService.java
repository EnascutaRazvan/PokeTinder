package com.fiipractic.breeding.service;

import com.fiipractic.breeding.model.Egg;
import com.fiipractic.breeding.model.EggStatus;
import com.fiipractic.breeding.repository.EggRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EggService {

    private final EggRepository eggRepository;

    public EggService(EggRepository eggRepository) {
        this.eggRepository = eggRepository;
    }

    @Scheduled(fixedDelay = 1000)
    public void scanEggs(Egg egg){
        System.out.println("Se scaneaza ouale");
        List<Egg> pendingEggs = eggRepository.findByStatus(EggStatus.PENDING);
        for(Egg pendingEgg : pendingEggs){
            if(pendingEgg.getHatchTime().isBefore(LocalDateTime.now())){
                pendingEgg.setStatus(EggStatus.HATCHED);
                eggRepository.save(pendingEgg);
                System.out.println("Egg hatched");
            }
        }
    }
}
